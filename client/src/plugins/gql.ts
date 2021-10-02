export default function gql(strings: TemplateStringsArray, ...values: any[]) {
    if (strings.length === 1 && values.length === 0) return JSON.stringify({query: strings[0]})
    
    if (strings.length === values.length + 1) {
        let resultString = '';
        resultString += strings[0]
        for (let i = 0; i < values.length; i++) {
            resultString += values[i]
            resultString += strings[i+1]
        }
        return JSON.stringify({query: resultString})
    }

    throw new Error("gql tag: Unhandled case")
}