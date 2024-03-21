import { RuntimesInventoryResponse } from '../api/interfaces';

export const emptyResponse: RuntimesInventoryResponse = { response: [] };

export const mockInstanceResponse: RuntimesInventoryResponse = {
  response: [
    {
      id: 'mockId',
      accountId: 'accountId',
      orgId: 'orgId',
      hostname: 'mockHostname',
      launchTime: 1706245200000,
      vendor: 'mockVendor',
      versionString: 'mockVersionString',
      version: 'mockVersion',
      majorVersion: 17,
      osArch: 'mockOsArch',
      processors: 12,
      heapMin: 0,
      heapMax: 9999,
      created: 'mockCreated',
      javaClassVersion: 'mockJavaClassVersion',
      javaSpecificationVendor: 'mockJavaSpecificationVendor',
      javaVendor: 'mockJavaVendor',
      javaVendorVersion: 'mockJavaVendorVersion',
      javaVmName: 'mockJavaVmName',
      javaVmVendor: 'mockJavaVmVendor',
      jvmHeapGcDetails: 'mockJvmHeapGcDetails',
      jvmPid: 'mockJvmPid',
      jvmReportTime: 'mockJvmReportTime',
      systemOsName: 'mockSystemOsName',
      systemOsVersion: 'mockSystemOsVersion',
      javaHome: 'mockJavaHome',
      javaLibraryPath: 'mockJavaLibraryPath',
      javaCommand: 'mockJavaCommand',
      javaClassPath: 'mockJavaClassPath',
      jvmPackages: 'mockJvmPackages',
      jvmArgs: 'mockJvmArgs',
      workload: 'mockWorkload',
      isOcp: false,
    },
  ],
};
