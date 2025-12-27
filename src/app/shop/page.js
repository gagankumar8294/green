import { Suspense } from "react";
import ProductsClient from "./ProductClient";

export default function ShopPage() {
    return (
        <Suspense fallback={<div style={{paddding: 20}}>Loading shop...</div>}>
            <ProductsClient />
        </Suspense>
    )
}