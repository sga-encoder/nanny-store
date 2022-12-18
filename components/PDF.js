import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import { zeroAdd } from '../utils/zeroAdd'

const PDF = ({ billData }) => {
  const { nombre, numeroDeFacturacion, direccion, telefono, productosVendidos } = billData
  const styles = StyleSheet.create({
    page: {
      width: '100%',
      fontSize: '11pt'
    },
    section: {
      textAlign: 'center',
      margin: '4%'
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    info: {
      width: '80vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    infoContainerData: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row'
    },
    infoContentData: {
      width: '50%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row'
    },
    infoData: {
      width: '50%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      border: '1px border #000',
      padding: '2%'
    },
    table:
    {
      width: '80vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    row:
    {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    cell: {
      width: '35%',
      border: '1px border #000'
    },
    cell2: {
      width: '15%',
      border: '1px border #000'
    },
    cell3: {
      width: '20%',
      border: '1px border #000'
    }
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <View style={styles.section}>
            <Text>Factura de producto</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.info}>
              <View style={styles.infoContainerData}>
                <View style={styles.infoContentData}>
                  <Text style={styles.infoData}>Nombre:</Text>
                  <Text style={styles.infoData}>{ nombre }</Text>
                </View>
                <View style={styles.infoContentData}>
                  <Text style={styles.infoData}>N:</Text>
                  <Text style={styles.infoData}>{ zeroAdd(numeroDeFacturacion) }</Text>
                </View>
              </View>
              <View style={styles.infoContainerData}>
                <View style={styles.infoContentData}>
                  <Text style={styles.infoData}>Direccion:</Text>
                  <Text style={styles.infoData}>{ direccion }</Text>
                </View>
                <View style={styles.infoContentData}>
                  <Text style={styles.infoData}>Telefono:</Text>
                  <Text style={styles.infoData}>{ telefono }</Text>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <Text>Productos</Text>
            </View>
            <View style={styles.table}>
              <View style={styles.row}>
                <View style={styles.cell2}>
                  <Text>Ref</Text>
                </View>
                <View style={styles.cell}>
                  <Text>Nombre</Text>
                </View>
                <View style={styles.cell3}>
                  <Text>Cantidad</Text>
                </View>
                <View style={styles.cell2}>
                  <Text>Precio</Text>
                </View>
                <View style={styles.cell2}>
                  <Text>Total</Text>
                </View>
              </View>
              {
                productosVendidos.map(({ id, ref, categoria, nombre, talla, cantidadVendida, precio }) => (
                  <View style={styles.row} key={id}>
                    <View style={styles.cell2}>
                      <Text>{ref}</Text>
                    </View>
                    <View style={styles.cell}>
                      {
                          categoria === 'ropa'
                            ? <Text>{ nombre } ({talla})</Text>
                            : <Text>{ nombre }</Text>
                      }
                    </View>
                    <View style={styles.cell3}>
                      <Text>{ cantidadVendida }</Text>
                    </View>
                    <View style={styles.cell2}>
                      <Text>{ precio }</Text>
                    </View>
                    <View style={styles.cell2}>
                      <Text>{ precio * cantidadVendida }</Text>
                    </View>
                  </View>
                ))
              }
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default PDF
