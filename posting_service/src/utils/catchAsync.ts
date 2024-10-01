import { IReq, IRes } from "../routes/common/types";

const catchAsync = (fn: (arg0: IReq, arg1: IRes, arg2: any) => any) => (req: IReq, res: IRes, next: (arg0: any) => any) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
  
export { catchAsync };