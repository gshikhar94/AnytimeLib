export class book {
    id: number;
    name: string;
    authorName: string;
    imageUrl: string;
    issued:number;
    totalCopies: number;
    category: string;
    likes: number;


    constructor(id?: number, name?: string, authorName?: string,issued?:number ,imageUrl?: string, totalCopies?: number, category?: string, likes?: number) {
        this.id = id;
        this.name = name;
        this.authorName = authorName;
        this.issued=issued;
        this.imageUrl = imageUrl;
        this.totalCopies = totalCopies;
        this.category = category;
        this.likes = likes;
    }
}