"use client";
import { useParams } from "next/navigation";

export default function Page() {
    const { market } = useParams();

    return <div className="flex flex-row flex-1">
        <div className="flex flex-col justify-center items-center flex-1 pt-[100px]">
            Trade {market} page
        </div>
    </div>
}