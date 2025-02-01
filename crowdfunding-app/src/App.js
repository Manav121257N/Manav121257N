import React, { useState } from 'react';
import { ChakraProvider, extendTheme, Button, Box, Input, Textarea, Text } from '@chakra-ui/react'; // Correct import for Chakra UI
import { connectWallet } from './connectWallet'; // Your wallet connection file


// Create an explicit theme (you can add custom configurations here)
const theme = extendTheme({
  colors: {
    brand: {
      900: '#1A365D',
      800: '#153E75',
      700: '#2A69AC',
    },
  },
});

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    goal: '',
  });

  const handleConnectWallet = async () => {
    const address = await connectWallet();
    setWalletAddress(address);
  };

  const handleCreateCampaign = () => {
    if (newCampaign.title && newCampaign.goal) {
      const newId = campaigns.length + 1;
      const newCampaignData = {
        id: newId,
        title: newCampaign.title,
        description: newCampaign.description,
        goal: parseInt(newCampaign.goal),
        funds: 0,
      };
      setCampaigns([...campaigns, newCampaignData]);
      setNewCampaign({ title: '', description: '', goal: '' });
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" mt={10}>
        <Button colorScheme="teal" onClick={handleConnectWallet}>
          {walletAddress ? `Connected: ${walletAddress}` : 'Connect MetaMask'}
        </Button>
        {walletAddress && <Text mt={3}>Wallet: {walletAddress}</Text>}

        <Box mt={10}>
          <Input
            placeholder="Campaign Title"
            value={newCampaign.title}
            onChange={(e) =>
              setNewCampaign({ ...newCampaign, title: e.target.value })
            }
            mb={2}
          />
          <Textarea
            placeholder="Campaign Description"
            value={newCampaign.description}
            onChange={(e) =>
              setNewCampaign({ ...newCampaign, description: e.target.value })
            }
            mb={2}
          />
          <Input
            placeholder="Funding Goal"
            type="number"
            value={newCampaign.goal}
            onChange={(e) =>
              setNewCampaign({ ...newCampaign, goal: e.target.value })
            }
            mb={2}
          />
          <Button onClick={handleCreateCampaign} colorScheme="blue" mt={3}>
            Create Campaign
          </Button>
        </Box>

        <Box mt={10}>
          <Text fontSize="2xl">Campaigns</Text>
          {campaigns.map((campaign) => (
            <Box key={campaign.id} p={5} shadow="md" borderWidth="1px" mb={5}>
              <Text fontSize="xl">{campaign.title}</Text>
              <Text>{campaign.description}</Text>
              <Text>
                Goal: {campaign.goal} ETH | Raised: {campaign.funds} ETH
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
