export interface searchStudentInfoParams {
  pageSize: number;
  pageNo: number;
  stuName?: string;
  stunu: string;
  sex: string;
  collegeId: string;
  majorId: number;
  classId: number;
  export: number;

  // current: number;
  // courseCategory?: number;
  // status?: number;
  // majorId?: number;
}

export interface studentInfoList {
  records: studentInfoListRecord[];
  total: number;
  size: number;
  current: number;
  orders: any[];
  optimizeCountSql: boolean;
  searchCount: boolean;
  // pages: number;
}

interface studentInfoListRecord {
  id: string;
  classId: number;
  userName: string;
  startTime: string;
  address: string;
  idCard: number;
  avatar: string;
  sex: number;
  status: number;
  createTime: string;
  className: string;
  majorId: number;
  majorName: string;
  collegeName: string;
  sexName: string;
  stunu: number;
  email: string;
  phone: number;
}
