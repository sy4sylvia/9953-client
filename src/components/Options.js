import 'antd/dist/antd.css';

const _ = require('lodash');
const QUANTITY = [];

for (let i = 1; i <= 10; i++) {
    QUANTITY.push({
        value: _.toString(i),
        label: _.toString(i),
    });
}


export { QUANTITY };