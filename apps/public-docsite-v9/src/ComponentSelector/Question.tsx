import * as React from 'react';
import { Field, Radio, RadioGroup, tokens, makeStyles } from '@fluentui/react-components';

import { GroupQuestion } from './ComponentSelector';

const useStyles = makeStyles({
  secondLevel: { 'margin-left': '30px' },
  thirdLevel: { 'margin-left': '60px' },
  forthLevel: { 'margin-left': '90px' },
  foundMessage: { 'margin-bottom': '10px' },
  heading: { margin: '30px 0 10px 0' },
  root: {
    // Stack the label above the field with a gap
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2px',
    maxWidth: '1600px',
  },
  tagsList: {
    listStyleType: 'none',
    marginBottom: tokens.spacingVerticalXXS,
    marginTop: 0,
    paddingLeft: 0,
    display: 'flex',
    gridGap: tokens.spacingHorizontalXXS,
  },
  tooltip: { maxWidth: '500px important!', backgroundColor: 'red' },
  componentWrapper: {
    margin: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  questionsWrapper: {
    padding: '20px',
    margin: '20px 0',
    backgroundColor: 'white',
    borderRadius: '16px',
    border: '1px solid var(--colorNeutralStroke1, #e1dfdd)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  questionsLabel: {
    color: '#ff00ff',
    fontWeight: tokens.fontWeightBold,
    marginRight: '8px',
  },
  questionsText: {
    fontWeight: tokens.fontWeightBold,
    fontSize: tokens.fontSizeBase400,
  },
  questionContainer: {
    display: 'flex',
  },
  questionRightSide: {
    borderLeft: '1px solid #ff00ff',
    padding: '0 10px',
  },
  radioItem: {
    display: 'flex',
  },
  behaviors: { display: 'flex', gap: '10px' },
});

interface QuestionProps {
  question: GroupQuestion;
  number: number;
  updateDecisionForQuestion: (currentName: string, previousName: string) => void;
}

export const Question: React.FC<QuestionProps> = ({ question, number, updateDecisionForQuestion }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('none');

  return (
    <div className={classes.questionsWrapper}>
      <Field>
        <RadioGroup
          key={question.id}
          value={value}
          onChange={(_, data) => {
            setValue(previousValue => {
              updateDecisionForQuestion(data.value, previousValue);
              return data.value;
            });
          }}
          aria-labelledby={`${question.id}-heading`}
        >
          <div className={classes.questionContainer}>
            <div>
              <span className={classes.questionsLabel}>{`Q${number}`}</span>
            </div>
            <div className={classes.questionRightSide}>
              <span className={classes.questionsText} id={`${question.id}-heading`}>
                {question.question}
              </span>
              {question.answers.map(anser => (
                <Radio key={anser.value} value={anser.value} label={anser.text} className={classes.radioItem} />
              ))}
              <Radio value={'none'} label="Not applicable" className={classes.radioItem} />
            </div>
          </div>
        </RadioGroup>
      </Field>
    </div>
  );
};
