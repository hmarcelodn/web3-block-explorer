import React from 'react';
import { Table, Link, Input, Button, Progress, Spacer, Avatar, Loading } from '@nextui-org/react';

function BlockList ({ 
    blocks, 
    currentPage, 
    prevPage, 
    nextPage, 
    loading,
    maxBlockNumber
}) {    
    return (
        <>
            {
                blocks.length === 0  ? 
                <div style={{ 'textAlign': 'center' }}>
                    <Loading color={"secondary"} size="xl" />
                </div> : 
                <div>
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
                            <Table.Column>BLOCK NUMBER</Table.Column>
                            <Table.Column>NONCE</Table.Column>
                            <Table.Column>TXS</Table.Column>
                            <Table.Column>GAS USED</Table.Column>
                            <Table.Column>GAS LIMIT</Table.Column>
                            <Table.Column>BASE FEE</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {blocks.map((block) => (
                                <Table.Row key={block.number}>
                                    <Table.Cell>
                                        <div style={{ display: 'flex' }}>
                                            <Avatar squared text="ETH" color="gradient" textColor="white" />
                                            <Link color={"secondary"} href={`/block/${parseInt(block.number)}`}>{parseInt(block.number)}</Link>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>{parseInt(block.nonce)}</Table.Cell>
                                    <Table.Cell>{block.transactions.length}</Table.Cell>
                                    <Table.Cell>
                                        <Progress color="secondary" value={(parseInt(block.gasUsed._hex) * 100) / parseInt(block.gasLimit._hex)} />
                                    </Table.Cell>
                                    <Table.Cell>{parseInt(block.gasLimit._hex)}</Table.Cell>
                                    <Table.Cell>{parseInt(block.baseFeePerGas._hex)}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    <Spacer />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button color={"secondary"} disabled={loading || currentPage === 1} onClick={() => prevPage(currentPage === 1 ? 1 : currentPage - 1)}>
                            {loading ? <Loading type="points-opacity" color="secondary" size="md" />: 'Prev Page'}
                        </Button>
                        <Input readOnly placeholder="Read only" value={currentPage} />
                        <Button color={"secondary"} disabled={loading || currentPage === maxBlockNumber} onClick={() => nextPage(currentPage === maxBlockNumber ? maxBlockNumber : currentPage + 1)}>
                            {loading ? <Loading type="points-opacity" color="secondary" size="md" />: 'Next Page'}
                        </Button>
                    </div>
                </div>
            }
        </>
    );
}

export { BlockList }
