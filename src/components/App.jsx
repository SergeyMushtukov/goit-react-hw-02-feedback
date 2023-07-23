import React, { Component } from 'react';
import { Statistics } from './Statistics';
import { FeedbackOptions } from './FeedbackOptions';
import { Section } from './Section';
import { Notification } from './Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onButtonClickHandle = evt => {
    const nameCategory = evt.target.dataset.category;
    this.setState(prevState => ({
      [nameCategory]: prevState[nameCategory] + 1,
    }));
  };

  countTotalFeedback = () => {
    const values = Object.values(this.state);
    const totalFeedback = values.reduce((total, number) => {
      return total + number;
    }, 0);
    return totalFeedback;
  };

  countPositiveFeedbackPercentage = () => {
    return Math.round((this.state.good / this.countTotalFeedback()) * 100);
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();
    const categories = Object.keys(this.state);

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={categories}
            onLeaveFeedback={this.onButtonClickHandle}
          ></FeedbackOptions>
        </Section>
        {total > 0 ? (
          <Section title="Statistics">
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={positivePercentage}
            ></Statistics>
          </Section>
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </>
    );
  }
}
