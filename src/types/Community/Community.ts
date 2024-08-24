import { Contributor } from "./Contributor"
import { Rating } from "./Rating"
import { Submitter } from "./Submitter"

export type Community = {
    have: number
    want: number
    rating: Rating
    submitter: Submitter
    contributors: Contributor[]
    data_quality: string
    status: string
}