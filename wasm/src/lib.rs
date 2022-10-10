use serde::{Deserialize, Serialize};
use serde_wasm_bindgen::Error;
use std::io::Cursor;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(typescript_custom_section)]
const DTS_EXTRA: &'static str = r#"

export interface ZipMetadata {
    entries: ZipEntry[];
}

export interface ZipEntry {
    file_name: string;
    uncompressed_size: number;
    compressed_size: number;
    compression_method: string;
}

export function read_metadata(data: Uint8Array): ZipMetadata;

"#;

#[wasm_bindgen(skip_typescript)]
pub fn read_metadata(data: &[u8]) -> Result<JsValue, JsValue> {
    let mut archive = zip::ZipArchive::new(Cursor::new(data)).map_err(Error::new)?;

    let mut entries: Vec<ZipEntryJs> = vec![];
    for i in 0..archive.len() {
        let file = archive.by_index(i).map_err(Error::new)?;
        entries.push(ZipEntryJs {
            file_name: file.name().to_string(),
            uncompressed_size: file.size(),
            compressed_size: file.compressed_size(),
            compression_method: file.compression().to_string(),
        });
    }

    let result = ZipMetadataJs { entries };
    Ok(serde_wasm_bindgen::to_value(&result)?)
}

#[wasm_bindgen]
pub fn extract_by_index(data: &[u8], index: usize, mut dest: &mut [u8]) -> Result<(), JsValue> {
    let mut archive = zip::ZipArchive::new(Cursor::new(data)).map_err(Error::new)?;
    let mut file = archive.by_index(index).map_err(Error::new)?;
    std::io::copy(&mut file, &mut dest).map_err(Error::new)?;
    Ok(())
}

#[derive(Serialize, Deserialize)]
pub struct ZipMetadataJs {
    entries: Vec<ZipEntryJs>,
}

#[derive(Serialize, Deserialize)]
pub struct ZipEntryJs {
    file_name: String,
    uncompressed_size: u64,
    compressed_size: u64,
    compression_method: String,
}
