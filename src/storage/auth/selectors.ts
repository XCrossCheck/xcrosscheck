import { TStore } from '..';

export const logged = (state: TStore): boolean | null => state.auth.logged;
export const userRole = (state: TStore): string | null => state.auth.userRole;
export const githubId = (state: TStore): string | null => state.auth.githubId;
