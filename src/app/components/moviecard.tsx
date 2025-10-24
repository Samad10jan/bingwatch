import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import InfoDrawer from "./info-drawer";
// { data }: { data: any }
export default function MovieCard() {
    return (

        <Card className="w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction><InfoDrawer/></CardAction>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
                 
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>

    )

}