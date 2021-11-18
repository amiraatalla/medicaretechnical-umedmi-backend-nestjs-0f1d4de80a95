export interface SocialNetworkServiceInterface {
  getProfile(token: string): Promise<{ id: string; name: string }>;
}
