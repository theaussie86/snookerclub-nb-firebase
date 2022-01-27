import React from 'react';
import deLocale from 'date-fns/locale/de'
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const LocaleDateProvider = ({ children }) => {
    return <LocalizationProvider
        dateAdapter={DateAdapter}
        locale={deLocale}
    >
        {children}
    </LocalizationProvider>;
};

export default LocaleDateProvider;
