// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

type API_ENDPOINT = {
  apiVersion: string
  date: string
  endpoint: string
  code: string
  to?: string
}

const API_URI = ({
  apiVersion,
  date,
  endpoint,
  code,
  to = ""
}: API_ENDPOINT) => {
  if ( to === "") {
    return `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@${apiVersion}/${date}/${endpoint}/${code}.json`;
  } else {
    return `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@${apiVersion}/${date}/${endpoint}/${code}/${to}.json`;
  }
}
const API_VERSION = "1"

const fetchLatestAll = async () => {
  const response = await fetch(API_URI({
    apiVersion: API_VERSION,
    date: 'latest',
    endpoint: 'currencies',
    code: 'usd'
  }))
  const data = await response.json();

  return data;

}
const fetchLatestCurrency = async (code: string, to: string, date: string = "latest") => {
  const response = await fetch(API_URI({
    apiVersion: API_VERSION,
    date,
    endpoint: 'currencies',
    code,
    to
  }))

  const data = await response.json();

  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "POST") {
    const data = await fetchLatestCurrency(req.body.code, req.body.to).then(data => data)
    return res.status(200).json(data)
  }
}