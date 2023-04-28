import React, { useState, useEffect } from 'react';
import { Loading, Container, Image , Text } from '@nextui-org/react';
import { alchemy } from '../services/Alchemy';
import { BlockList } from '../components/BlockList'

const pageSize = 11;

function Home () {
    const [blockNumber, setBlockNumber] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getBlockNumber() {
          setBlockNumber(await alchemy.core.getBlockNumber());
        }
    
        getBlockNumber();
    }, []);
    
    useEffect(() => {
        async function getBlocks() {
          const pageBlocks = [];
          setLoading(true);
          for (let i = blockNumber - ((currentPage - 1) * pageSize); i > blockNumber - (currentPage * pageSize); i--){
            const block = await alchemy.core.getBlock(i);
            pageBlocks.push(block);
          }
    
          setLoading(false);
          setBlocks(pageBlocks);
        }
    
        getBlocks();
    }, [currentPage, blockNumber]);

    return (
        <Container>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>
                <Image
                  width={160}
                  height={100}  
                  src="https://download.logo.wine/logo/Ethereum/Ethereum-Logo.wine.png"
                  alt="Default Image"
                  objectFit="cover"
                />
              </div>
              <div>
                <h1>Ethereum Block Explorer</h1>
                <h3>Block Height: {blockNumber ? blockNumber : <Loading type='points-opacity' />}</h3>
              </div>
            </div>
            <BlockList 
                currentPage={currentPage} 
                blocks={blocks} 
                nextPage={setCurrentPage}
                prevPage={setCurrentPage}
                loading={loading}
                maxBlockNumber={blockNumber}
            />
        </Container>
    )
}

export { Home }
