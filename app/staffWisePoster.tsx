import Image from "next/image";

export function StaffWisePoster(){
    return <>
    <div className="flex justify-between items-end">
        <div className="bg-[#5c2f32] text-white px-3 py-1 text-sm">UNIVERSITY ORGANIZERS</div>
        <div className="flex">
            <Image
                src="/mainLogo.png"
                alt="University Logo"
                width={45}
                height={45}
                className="object-contain text-[#f5f0e6]"
            />
            <Image
                src="/univLogo.png"
                alt="University Logo"
                width={45}
                height={45}
                className="object-contain mx-4 my-2"
            />
        </div>
    </div>

    <div className="p-4">
        <h1 className="text-[#5c2f32] text-3xl font-extrabold mx-2 leading-tight">
        WEEKLY
        <br />
        STUDY PROGRAMME
        </h1>

        <div className="mt-2 flex justify-center">
            <Image
                src="/groupStudy.png"
                alt="Students studying together"
                width={385}
                height={385}
            />
        </div>
    </div>
    </>
    
}