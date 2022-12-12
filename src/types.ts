interface ResponseBody {
  data: {
    translations?: Translation[]
  }
}

interface Translation {
  translatedText: string
  detectedSourceLanguage: string
}

export { ResponseBody }
