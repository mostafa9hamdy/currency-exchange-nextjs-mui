import { Autocomplete, Box, Divider, Stack, TextField, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useState, Dispatch, SetStateAction, ChangeEvent, useEffect } from 'react'

interface ConverterProps {
  currencies: {[key: string]: string}
  fromCurrency: string
  setFromCurrency: Dispatch<SetStateAction<string>>
  toCurrency: string
  setToCurrency: Dispatch<SetStateAction<string>>
  fromExchange: number 
  setFromExchange: Dispatch<SetStateAction<number>>
  toExchange: number 
  setToExchange: Dispatch<SetStateAction<number>>
  currencyValue: number
}

export const Converter = ({
    currencies,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    fromExchange,
    setFromExchange,
    toExchange,
    setToExchange,
    currencyValue
  }: ConverterProps) => {
  const { t } = useTranslation('common');

  useEffect(() => {
    setToExchange(fromExchange * currencyValue)
  },[fromExchange]);

  return (
    <Box sx={{pt: 2,m: 0,color: 'primary.main',boxShadow: 3,p: 2,borderRadius: 2}}>
      <Typography variant="h5" sx={{mb: 2}}>{t('converter.select-currency')}</Typography>
      <Stack alignItems="center" sx={{mb: 2,flexDirection: {md: 'row',xs: 'column'}}}>
        <Autocomplete
          inputValue={fromCurrency}
          onInputChange={(event, value) => setFromCurrency(value.slice(0,3))}
          renderInput={(params) => <TextField label={t("converter.from")} {...params} />}
          options={Object.keys(currencies).map( key => `${key} - ${currencies[key]}`)}
          sx={{width: '100%',marginBottom: {md: 0,xs: 2}}}
        />
        <Divider sx={{display: {md: 'block',xs: 'none'}}}>{t("converter.to")}</Divider>
        <Autocomplete
          inputValue={toCurrency}
          onInputChange={(event, value) => setToCurrency(value.slice(0,3))}
          renderInput={(params) => <TextField label={t("converter.to")} {...params}/>}
          options={Object.keys(currencies).map( key => `${key} - ${currencies[key]}`)}
          sx={{width: '100%'}}
        />
      </Stack>
      {
        fromCurrency !== "" &&
        toCurrency !== "" &&
        <Stack alignItems="center"  sx={{mb: 2,flexDirection: {md: 'row',xs: 'column'}}}>
          <TextField
            type="number"
            label={currencies[fromCurrency]}
            value={fromExchange}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setFromExchange(parseFloat(event.target.value))}
            sx={{width: '100%'}}
          />
          <Divider sx={{my: {md: 0,xs: 2}}}>{t("converter.equel")}</Divider>
          <TextField
            type="number"
            value={toExchange}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setToExchange(parseFloat(event.target.value))}
            label={currencies[toCurrency]}
            sx={{width: '100%'}}
            disabled
          />
        </Stack>
      }
    </Box>
  )
}
