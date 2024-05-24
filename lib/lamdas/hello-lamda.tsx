import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

export const handler1 = async () => {
    return "I LOVE ❤️ AWS Lambdas";
}

export const handler = async (e: APIGatewayProxyEventV2): Promise<APIGatewayProxyEventV2> => {
    console.log(e);

    return {
        statusCode: 200,
        body: JSON.stringify(e) 
    }

} 