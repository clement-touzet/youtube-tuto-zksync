import { Deployer } from '@matterlabs/hardhat-zksync-deploy';
import { ZkSyncArtifact } from '@matterlabs/hardhat-zksync-deploy/dist/types';
import { Contract, Wallet } from 'zksync-web3';
import * as hre from 'hardhat';

export async function deployEventFactory(wallet: Wallet): Promise<Contract> {
    console.log('Deploying EventFactory...');
    let deployer: Deployer = new Deployer(hre, wallet);
    const artifact: ZkSyncArtifact = await deployer.loadArtifact(
        'EventFactory'
    );
    console.log('Artifact EventFactory: ' + artifact);
    return await deployer.deploy(artifact);
}
