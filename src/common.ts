import * as _ from 'lodash'
import './common.css'
export const fn = () => {
    console.log('common', _.chunk(['a', 'b', 'c', 'd'], 2));
}