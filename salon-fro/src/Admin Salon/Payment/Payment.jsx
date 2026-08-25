import { Button, Card, Divider } from '@mui/material'
import React from 'react'
import TransactionTable from './TransactionTable';

const Payment = () => {
    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                <Card className='col-span-1 p-5 rounded-md space-y-4'>
                    <h1 className='text-gray-600 font-medium'>Total Earning</h1>
                    <h1 className='font-bold text-xl pb-1'>₹0</h1>
                    <Divider />
                    <p className='text-gray-600 font-medium pt-1'>Last Payment : <strong>₹0</strong></p>
                </Card>
            </div>
            <div className='mt-20'>

                <div className='flex gap-4'>
                    <Button variant="contained">Transaction</Button>
                </div>
                <div className='mt-5'>
                    <TransactionTable />
                </div>

            </div>
        </div>
    )
}

export default Payment