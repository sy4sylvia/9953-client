import 'antd/dist/antd.css';

const _ = require('lodash');

const QUANTITY = [];

for (let i = 1; i <= 10; i++) {
    QUANTITY.push({
        value: _.toString(i),
        label: _.toString(i),
    });
}

const QUESTIONS = [
    {
        label: 'In what city did you first visit a museum?',
        key: 'In what city did you first visit a museum?',
    },
    {
        label: 'In which city were you born?',
        key: 'In which city were you born?',
    },
    {
        label: 'What is the name of your first pet?',
        key: 'What is the name of your first pet?',
    },
    {
        label: 'What is your father’s mother’s maiden name?',
        key: 'What is your father’s mother’s maiden name?',
    },
    {
        label: 'What is your favorite book?',
        key: 'What is your favorite book?',
    },
    {
        label: 'What is your favorite fruit?',
        key: 'What is your favorite fruit?',
    },
    {
        label: 'What is your favorite topping for pizza?',
        key: 'What is your favorite topping for pizza?',
    },
    {
        label: 'What is your mother’s maiden name?',
        key: 'What is your mother’s maiden name?',
    },
    {
        label: 'Where are you now?',
        key: 'Where are you now?',
    },
    {
        label: 'Which year did your parents get married?',
        key: 'Which year did your parents get married?'
    },
]

export { QUANTITY, QUESTIONS};