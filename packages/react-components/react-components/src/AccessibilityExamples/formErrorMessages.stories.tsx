import * as React from 'react';

import { Button, Input, Label, Text, Divider } from '@fluentui/react-components';

import { Scenario } from './utils';

import { useForm, Controller, OnSubmit } from 'react-hook-form';
import { usePubSub, PubSubProvider, Handler } from '@cactuslab/usepubsub';

const regexes = {
  onlyNameChars: /^[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ -]*$/,
  // eslint-disable-next-line @fluentui/max-len
  startsAndEndsWithLetter: /^(([A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ][A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ -]*[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ])|[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ])?$/,
  noWhitespace: /^\S*$/,
  hasNumber: /^\S*[0-9]\S*$/,
  hasLowercaseLetter: /^\S*[a-z]\S*$/,
  hasUppercaseLetter: /^\S*[A-Z]\S*$/,
  hasSpecialChar: /^\S*[^0-9a-zA-ZÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ\s]\S*$/,
  validDate: /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/,
  validEmail: new RegExp(
    // eslint-disable-next-line @fluentui/max-len
    "(([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*]))?",
  ),
};

interface FormInputs {
  fullName: string;
  email: string;
}

interface FormValidation {
  subscribe: (channel: string, handler: Handler) => () => void;
  unsubscribe: (channel: string, handler: Handler) => void;
}

interface ValidationMessageProps {
  id: string;
  formValidation: FormValidation;
}
const ValidationMessage: React.FC<ValidationMessageProps> = ({ id, formValidation, children }) => {
  const [isAlerting, setIsAlerting] = React.useState(true);

  const alert = React.useCallback(() => {
    setIsAlerting(false);
    setTimeout(() => setIsAlerting(true), 200);
  }, [setIsAlerting]);

  React.useEffect(() => {
    formValidation.subscribe(id, alert);
    return () => formValidation.unsubscribe(id, alert);
  }, [formValidation, alert, id]);
  return (
    <>
      {isAlerting ? (
        <div role="alert" style={{ color: 'red' }} id={`${id}Errors`}>
          {children}
        </div>
      ) : (
        <div style={{ color: 'green' }} id={`${id}Errors`}>
          {children}
        </div>
      )}
    </>
  );
};

const useFormValidation = (
  handleSubmit: (callback: OnSubmit<FormInputs>) => (e?: React.BaseSyntheticEvent) => Promise<void>,
) => {
  const pubSub = usePubSub();
  const isSubmitting = React.useRef(false);

  const wrappedHandleSubmit = React.useCallback(
    (callback: OnSubmit<FormInputs>) => {
      const handler = handleSubmit(callback);
      return async (e: React.BaseSyntheticEvent) => {
        isSubmitting.current = true;
        const result = await handler(e);
        isSubmitting.current = false;
        return result;
      };
    },
    [isSubmitting, handleSubmit],
  );

  const onFieldValidated = React.useCallback(
    (field: string) => {
      if (!isSubmitting.current) {
        pubSub.publish(field, 'validate');
      }
      return true;
    },
    [isSubmitting, pubSub],
  );

  const notifyFormFieldError = React.useCallback(
    (field: string) => {
      pubSub.publish(field, 'validate');
      return true;
    },
    [pubSub],
  );

  return {
    subscribe: pubSub.subscribe,
    unsubscribe: pubSub.unsubscribe,
    onFieldValidated,
    handleSubmit: wrappedHandleSubmit,
    notifyFormFieldError,
  };
};

const BadFormExample = () => {
  const { control, handleSubmit, errors, formState } = useForm<FormInputs>({
    validateCriteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const formValidation = useFormValidation(handleSubmit);

  const [isSubmittedAndValid, setIsSubmittedAndValid] = React.useState(false);

  React.useEffect(() => {
    // If the form is submitted and has errors, focus the first error fiel, otherwise do nothing
    if (!formState.isSubmitted || formState.isValid) {
      return;
    }
    const firstErrorName = Object.keys(errors)[0] as keyof FormInputs;
    const firstErrorField = document.getElementById(firstErrorName);
    if (firstErrorField) {
      firstErrorField.focus();
    }
  }, [errors, formState, formValidation]);

  React.useEffect(() => {
    if (isSubmittedAndValid) {
      document.getElementById('bad_validMessage')?.focus();
    }
  }, [isSubmittedAndValid]);

  const onSubmit = (data: FormInputs, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    if (formState.isValid) {
      setIsSubmittedAndValid(true);
    }
  };

  return (
    <>
      {!isSubmittedAndValid ? (
        <form onSubmit={formValidation.handleSubmit(onSubmit)}>
          <Label htmlFor="bad_fullName">Full name:</Label>
          <Controller
            name="fullName"
            control={control}
            as={
              <Input
                type="text"
                id="bad_fullName"
                aria-required="true"
                aria-invalid={!!errors.fullName}
                aria-describedby="bad_fullNameErrors"
              />
            }
            rules={{
              required: true,
              minLength: 2,
              maxLength: 50,
              validate: {
                onlyNameChars: value => regexes.onlyNameChars.test(value),
                startsAndEndsWithLetter: value => regexes.startsAndEndsWithLetter.test(value),
                always: () => {
                  if (!formState.isSubmitting) {
                    formValidation.onFieldValidated('fullName');
                  }
                  return true;
                },
              },
            }}
          />
          {errors.fullName?.types && (
            <ValidationMessage id="bad_fullName" formValidation={formValidation}>
              {'required' in errors.fullName.types ? (
                <p>Full name is required.</p>
              ) : (
                <>
                  <p>Full name is invalid. It must:</p>
                  <ul>
                    {('minLength' in errors.fullName.types || 'maxLength' in errors.fullName.types) && (
                      <li>Have between 2 and 50 characters.</li>
                    )}
                    {'onlyNameChars' in errors.fullName.types && (
                      <li>Contain only lowercase or uppercase letters, spaces or hyphens.</li>
                    )}
                    {'startsAndEndsWithLetter' in errors.fullName.types && <li>Start and end wit letter.</li>}
                  </ul>
                </>
              )}
            </ValidationMessage>
          )}

          <Label htmlFor="bad_email">E-mail:</Label>
          <Controller
            name="email"
            control={control}
            as={
              <Input
                type="text"
                id="bad_email"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby="bad_emailErrors"
              />
            }
            rules={{
              required: true,
              validate: {
                validEmail: value => regexes.validEmail.test(value),
                always: () => {
                  if (!formState.isSubmitting) {
                    formValidation.onFieldValidated('email');
                  }
                  return true;
                },
              },
            }}
          />
          {errors.email?.types && (
            <ValidationMessage id="bad_email" formValidation={formValidation}>
              {'required' in errors.email.types ? (
                <p>E-mail is required.</p>
              ) : (
                <>
                  <p>E-mail is invalid. It must:</p>
                  <ul>
                    {'validEmail' in errors.email.types && <li>Be a valid e-mail address, like name@example.com.</li>}
                  </ul>
                </>
              )}
            </ValidationMessage>
          )}

          <Button type="submit">Subscribe</Button>
        </form>
      ) : (
        <p id="bad_validMessage" role="alert" tabIndex={-1}>
          The form is valid and would have been submitted.
        </p>
      )}
    </>
  );
};

export const FormErrorMessagesExample = () => {
  return (
    <Scenario pageTitle="Error messages for form fields">
      <h1>Error messages for form fields</h1>

      <h2>Bad example</h2>
      <PubSubProvider>
        <BadFormExample />
      </PubSubProvider>

      <h3>Screen reader narration after menu button activation</h3>
      <Text block>
        <Text weight="semibold">JAWS:</Text> "Profile menu
        <br />
        Account settings..., first item of four. To move through items press up or down arrow.
        <br />
        Change status message..., second item of four
        <br />
        Help, third item of four
        <br />
        Sign out, fourth item of four"
      </Text>
      <h3>Implementation details</h3>
      <ul>
        <li>
          The "X of Y" position information is hard-coded manually as the part of each menu item's "aria-label"
          attribute value.
        </li>
      </ul>
      <Divider />
      <h2>Good example</h2>

      <h3>Screen reader narration after menu button activation</h3>
      <Text block>
        <Text weight="semibold">JAWS:</Text> "Profile menu
        <br />
        Account settings..., 1 of 4. To move through items press up or down arrow.
        <br />
        Change status message..., 2 of 4<br />
        Help, 3 of 4<br />
        Sign out, 4 of 4"
      </Text>
      <h3>Implementation details</h3>
      <ul>
        <li>
          The "X of Y" position information is added automatically by the screen reader for each menu item because the
          correct ARIA role is used both for all individual menu item elements (role="menuitem") and the parent menu
          element (role="menu").
        </li>
      </ul>
      <Divider />
      <h2>Problem explanation</h2>
      <ul>
        <li>
          Even though the screen reader narration might seem similar, don't hard-code "X of Y" position information
          manually as the part of the accessible name of each individual item, but instead use proper ARIA roles and let
          the screen reader add the "X of Y" information for you.
        </li>
        <li>
          The JAWS screen reader currently supports the "X of Y" information for the following roles: listbox,
          menu,tablist. See the <a href="https://www.w3.org/TR/wai-aria-1.2/">ARIA specification</a> to learn which
          required owned elements (such as option, menuitem or tab) should be used with these roles.
        </li>
        <li>
          Letting the screen reader add the "X of Y" position information for you also avoids the need to manually
          translate this information to the desired UI language.
        </li>
      </ul>
    </Scenario>
  );
};
