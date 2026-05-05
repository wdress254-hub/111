/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HardwareProfile {
  id: string;
  name: string;
  cpu: string;
  gpu: string;
  ram: string;
  disk: string;
  motherboard: string;
  mac: string;
  hwid: string;
  os: string;
}

export const DEFAULT_PROFILES: HardwareProfile[] = [
  {
    id: 'potato',
    name: 'The Potato',
    cpu: 'Intel Pentium II 266MHz',
    gpu: '3dfx Voodoo2',
    ram: '64MB SDRAM',
    disk: '4GB IDE HDD',
    motherboard: 'Dell Dimension XPS',
    mac: '00:01:42:01:02:03',
    hwid: 'HWID-OLD-SCHOOL-1234',
    os: 'Windows 98 SE'
  },
  {
    id: 'legend',
    name: 'God Spec',
    cpu: 'AMD Ryzen Threadripper PRO 7995WX (96 Cores)',
    gpu: '4x NVIDIA RTX 6000 Ada Generation',
    ram: '10TB LPDDR5X',
    disk: '500TB NVMe RAID 0',
    motherboard: 'ASUS Pro WS TRX50-SAGE WIFI',
    mac: 'DE:AD:BE:EF:CA:FE',
    hwid: 'HWID-GOD-LEVEL-INFINITY',
    os: 'Windows 11 Enterprise (Custom Build 99999)'
  },
  {
    id: 'ghost',
    name: 'Ghost Identity',
    cpu: 'Unknown Processor',
    gpu: 'Generic VGA Adapter',
    ram: '32GB',
    disk: 'Internal Drive',
    motherboard: 'OEM Board',
    mac: 'FF:FF:FF:FF:FF:FF',
    hwid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    os: 'FreeBSD 14.0-RELEASE'
  },
  {
    id: 'alien',
    name: 'Interdimensional Spec',
    cpu: 'Quantum Singularity Core XT @ 1.2 THz',
    gpu: 'Hyper-Reality Projection Matrix (8th Gen)',
    ram: '1 Yottabyte Antimatter Memory',
    disk: 'Holographic Event Horizon Storage',
    motherboard: 'Andromeda Galaxy V2 Board',
    mac: 'AL:IE:N1:ST:AR:SH',
    hwid: 'HWID-BEYOND-COMPREHENSION',
    os: 'Nexus OS (StarDate 4310.2)'
  }
];
