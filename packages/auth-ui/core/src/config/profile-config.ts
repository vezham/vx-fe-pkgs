/** Configuration for account profile editing. */
export type ProfileConfig = {
  /**
   * Show the display name field and include it in profile updates.
   * Independent of `emailAndPassword.name`, which controls sign-up only.
   * @default true
   */
  name: boolean
}
