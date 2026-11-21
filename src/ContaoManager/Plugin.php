<?php

declare(strict_types=1);

namespace Karrieremag\AudeBundle\ContaoManager;

use Contao\CoreBundle\ContaoCoreBundle;
use Contao\ManagerPlugin\Bundle\BundlePluginInterface;
use Contao\ManagerPlugin\Bundle\Config\BundleConfig;
use Contao\ManagerPlugin\Bundle\Parser\ParserInterface;
use Karrieremag\AudeBundle\KarrieremagAudeBundle;

class Plugin implements BundlePluginInterface
{
    public function getBundles(ParserInterface $parser): array
    {
        return [BundleConfig::create(KarrieremagAudeBundle::class)->setLoadAfter([ContaoCoreBundle::class])];
    }
}
