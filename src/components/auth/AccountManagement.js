import React from 'react'
import PageWrapper from '../layout/PageWrapper'
import { useSearchParams } from "react-router-dom";
import { ResetPassword } from './ResetPassword';
import ActivateUser from './ActivateUser';

function AccountManagement() {
    const [searchParams, setSearchParams] = useSearchParams()
    const params = { 'mode': null, 'oobCode': null, 'apiKey': null, 'lang': null, 'continueUrl': null }

    for (let p of Object.keys(params)) {
        params[p] = searchParams.get(p)
    }

    return (
        <PageWrapper className='page' backgroundColor={true}>
            {params.mode === 'resetPassword' && <ResetPassword params={params} />}
            {params.mode === 'signIn' && <ActivateUser params={params} />}
        </PageWrapper>
    )
}

export default AccountManagement
