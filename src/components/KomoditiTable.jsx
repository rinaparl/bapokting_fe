import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Box,
} from "@chakra-ui/react";

function KomoditiTable() {
  const [hargaData, setHargaData] = useState([]);
  const [tanggalUpdate, setTanggalUpdate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getKomoditi = async () => {
      try {
        const response = await axios.get('http://localhost:5000/komoditi/list');
        if (response.data.success && Array.isArray(response.data.result)) {
          setHargaData(response.data.result);
          setTanggalUpdate(response.data.result[0]?.tanggal);
        } else {
          setError("Data yang diterima tidak sesuai");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    getKomoditi();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  const formattedTanggalUpdate = new Date(tanggalUpdate).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Harga per tanggal: {formattedTanggalUpdate}
      </Text>
      
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Komoditi</Th>
              <Th>Satuan</Th>
              <Th>Pasar Guntur</Th>
              <Th>Pasar Kadungora</Th>
              <Th>Pasar Cikajang</Th>
              <Th>Pasar Pameungpeuk</Th>
              <Th>Pasar Samarang</Th>
              <Th>Pasar Malambong</Th>
              <Th>Rata-Rata Minggu Ini</Th>
              <Th>Rata-Rata Minggu Lalu</Th>
              <Th>Keterangan</Th>
              <Th>%</Th>
            </Tr>
          </Thead>
          <Tbody>
            {hargaData.length > 0 ? (
              hargaData.map((item, index) => (
                <Tr key={item.id}>
                  <Td>{index + 1}</Td>
                  <Td>{item.komoditi_name}</Td>
                  <Td>{item.satuan}</Td>
                  <Td>{item.p_guntur}</Td>
                  <Td>{item.p_kadungora}</Td>
                  <Td>{item.p_cikajang}</Td>
                  <Td>{item.p_pameungpeuk}</Td>
                  <Td>{item.p_samarang}</Td>
                  <Td>{item.p_malangbong}</Td>
                  <Td>{item.med_minggu_ini}</Td>
                  <Td>{item.med_minggu_lalu}</Td>
                  <Td>{item.keterangan}</Td>
                  <Td>{item.persentase}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={13}>Tidak ada data</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default KomoditiTable;
