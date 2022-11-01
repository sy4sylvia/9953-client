import React from 'react';
import { Pagination } from 'antd';

import 'antd/dist/antd.css';

const SearchResults = () => {

    return (
        <div>

            <Pagination defaultCurrent={6} total={500} />
        </div>
    )


}

export default SearchResults;