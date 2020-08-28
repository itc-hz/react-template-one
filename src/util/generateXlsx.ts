import XLSX from 'xlsx';

const arrayToSheet = (array: any) => {
    const sheet = XLSX.utils.aoa_to_sheet(array);
    sheet['!merges'] = [
        {s: {r: 0, c: 0}, e: {r: 0, c: 1}},
    ];
    sheet['!cols'] = [{wch: 20}, {wch: 120}];
    return sheet;
};

export const getXlsxblob = (array: any, sheetName: any) => {
    const sheet = arrayToSheet(array);
    sheetName = sheetName || 'sheet1';
    const workbook: any = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    const wopts: any = {
        bookType: 'xlsx',
        themeXLSX: 'XLSM',
        bookSST: false,
        type: 'binary'
    };
    const s2ab = (s: any) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    };
    const wbout = XLSX.write(workbook, wopts);
    const blob = new Blob([s2ab(wbout)], {type: "application/octet-stream"});
    return blob;
};

