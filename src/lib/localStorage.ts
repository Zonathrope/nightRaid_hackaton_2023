class LocalStorage {
  private ID = 'ID'

  public getUserId = (): string | null => {
    return localStorage.getItem(this.ID)
  }

  public setUserId = (id: string): void => {
    return localStorage.setItem(this.ID, id)
  }

  public removeUser = () => {
    localStorage.removeItem(this.ID)
  }
}

export default new LocalStorage()
