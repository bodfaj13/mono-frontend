export interface textinputInterface {
  placeHolder?: string,
  name: string,
  onChange?: (value: string | number) => void
  disabled: boolean,
  hasError?: boolean,
  updateField?: (name: string, value: string) => void,
}