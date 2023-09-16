
export type HeaderProps = {
    onSearch: Function
}
export type MainBodyProps = {
    searchValue: string
}
export interface Room {
    _id?: string
    title: string;
    description: string;
    desks: number;
    imageURL: string;
    isBooked: boolean
}