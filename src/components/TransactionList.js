import React from 'react';
import { Table, Avatar } from '@nextui-org/react';

function TransactionList({ transactions })  {
    return (
        <Table
            bordered
            shadow={false}
            color="secondary"
            css={{
                height: "auto",
                minWidth: "100%",
            }}
            selectionMode="single"
        >
            <Table.Header>
                <Table.Column>TXN HASH</Table.Column>
                <Table.Column>FROM</Table.Column>
                <Table.Column>TO</Table.Column>
                <Table.Column>VALUE</Table.Column>
                <Table.Column>BLOCK NUMBER</Table.Column>
            </Table.Header>
            <Table.Body>
                {transactions.map((tx) => (
                    <Table.Row key={tx.hash}>
                        <Table.Cell>
                            <div style={{ display: 'flex' }}>
                                <Avatar squared text="TX" color="gradient" textColor="white" />
                                {tx.hash.toString().slice(20)}...
                            </div>
                        </Table.Cell>
                        <Table.Cell>{tx.from.toString().slice(20)}...</Table.Cell>
                        <Table.Cell>{tx.to ? tx.to.slice(20) + '...' : 'N/A'}</Table.Cell>
                        <Table.Cell>{parseInt(tx.value._hex)}</Table.Cell>
                        <Table.Cell>{parseInt(tx.blockNumber)}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
            <Table.Pagination
                    shadow
                    noMargin
                    align="center"
                    rowsPerPage={10}
                    onPageChange={(page) => console.log({ page })}
                />
        </Table>
    )
}

export { TransactionList }
