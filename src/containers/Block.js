import { useEffect, useState } from 'react';
import { Loading, Container } from '@nextui-org/react';
import { useParams } from 'react-router';
import { alchemy } from '../services/Alchemy';
import { TransactionList } from '../components/TransactionList';

function Block() {
    const params = useParams();
    const [block, setBlock] = useState();

    useEffect(() => {
        if (params) {
            async function getBlockWithTransactions() {
                setBlock(await alchemy.core.getBlockWithTransactions(parseInt(params.blockNumber)));
            }
          
            getBlockWithTransactions();
        }
    }, [params]);

    return (
        <Container>
            <h1>Transactions</h1>
            <h3>Block #: {block ? block.number : 'N/A'}</h3>
            {block ? 
            <TransactionList transactions={block.transactions || []} /> : 
            <div style={{ 'textAlign': 'center' }}>
                <Loading color={"secondary"} size="xl" />
            </div>
            }
        </Container>
    );
}

export { Block }
