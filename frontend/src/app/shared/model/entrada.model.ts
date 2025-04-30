import { UUID } from "crypto";
import { Categoria } from "../../features/categorias/models/categoria.model";
import { TypeRegistry } from "../../features/entradas/model/typeRegistry.model";

export interface Entrada{
    idRegistry?: string,
    nameRegistry: string,
    category: Categoria,
    status: boolean,
    date: string,
    amount: number,
    quantityInstallments: number
    type: TypeRegistry
}