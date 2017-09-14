<?php
namespace Oro\Bundle\MessageQueueBundle\Consumption\Extension;

use Oro\Component\MessageQueue\Consumption\AbstractExtension;
use Oro\Component\MessageQueue\Consumption\Context;
use Symfony\Bridge\Doctrine\RegistryInterface;

class DoctrinePingConnectionExtension extends AbstractExtension
{
    /**
     * @var RegistryInterface
     */
    protected $registry;

    /**
     * @param RegistryInterface $registry
     */
    public function __construct(RegistryInterface $registry)
    {
        $this->registry = $registry;
    }

    /**
     * {@inheritdoc}
     */
    public function onPreReceived(Context $context)
    {
        $logger = $context->getLogger();
        $connections = $this->registry->getConnectionNames();
        foreach ($connections as $name => $serviceId) {
            $connection = $this->registry->getConnection($name);
            if ($connection->ping()) {
                return;
            }

            $logger->debug('[DoctrinePingConnectionExtension] Connection is not active trying to reconnect.');

            $connection->close();
            $connection->connect();

            $logger->debug('[DoctrinePingConnectionExtension] Connection is active now.');
        }
    }
}
