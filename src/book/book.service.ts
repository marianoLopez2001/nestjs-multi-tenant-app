import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Book } from "../generated/prisma";
import { BookCreateInput } from "../generated/prisma/models";

@Injectable()
export class BookService {
    constructor(private prisma: PrismaService) { }

    async getBooks(params: Params) {
        return this.prisma.book.findMany()
    }

    async getBook(id: string, params: Params) {
        return this.prisma.book.findUnique({
            where: {
                id: parseInt(id) //?
            }
        })
    }

    async deleteBook(id: string) {
        return this.prisma.book.delete({
            where: {
                id: parseInt(id) //?
            }
        })
    }

    async postBook(book: BookCreateInput) {
        return this.prisma.book.create({ data: book })
    }
}
