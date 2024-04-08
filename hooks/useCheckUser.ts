import { checkUserAuthFx } from "@/api/auth";
const useCheckUser = async () => {
    const user = await checkUserAuthFx("/users/login-check");
    return !!user
};

export default useCheckUser;
