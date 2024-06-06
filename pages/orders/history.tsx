import NextLink from 'next/link'
import { ShopLayout } from '@/components/layouts'
import { Typography, Grid, Chip } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'fullName', headerName: 'Full name', width: 300},

    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra si la orden fue pagada',
        width: 200,
        renderCell: (params) => {
            return (
                params.row.paid
                ? <Chip color='success' label='Pagada' variant='outlined' />
                : <Chip color='error' label='No pagada' variant='outlined' />
            )
        }
    },

    {
        field: 'Orden',
        headerName: 'Ver orden',
        width: 200,
        renderCell: (params) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    Ver productos
                </NextLink>
            )
        }
    }
]

const rows = [
    {id: 1, paid: true, fullName: 'Juan Perez'},
    {id: 2, paid: false, fullName: 'Juan Perez'},
    {id: 3, paid: false, fullName: 'Juan Perez'},
    {id: 4, paid: true, fullName: 'Juan Perez'},

]

const HistoryPage = () => {
  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes en la tienda'}>
      <Typography variant='h1' component='h1'>Historial de ordenes</Typography>


        <Grid container>
            <Grid item xs={12} sx={{height:650, width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoPageSize
                    // rowsPerPageOptions = {[10]}
                />
            </Grid>
        </Grid>

    </ShopLayout>
  )
}

export default HistoryPage