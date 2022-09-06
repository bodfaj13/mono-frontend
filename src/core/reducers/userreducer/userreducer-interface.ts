import { loginUserPayload } from "../../actions/useractions/useraction-interface";

export interface userReducerInterface extends loginUserPayload {
  loading: boolean,
}