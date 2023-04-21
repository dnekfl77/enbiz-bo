package com.enbiz.bo.base.upload;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUploader implements Uploader {

	@Override
	public Map<String, Object> upload(MultipartFile multipartFile, UploadReqDto uploadReqDto) {
		throw new RuntimeException("Not supported.");
	}

	@Override
	public Map<String, Object> upload(List<MultipartFile> multipartFiles, UploadReqDto uploadReqDto) {
		throw new RuntimeException("Not supported.");
	}

	@Override
	public boolean confirmFile() {
		throw new RuntimeException("Not supported.");
	}

	@Override
	public void deleteFile(List<String> fullPathList) {
		throw new RuntimeException("Not supported.");
	}

	@Override
	public ResponseEntity<byte[]> downloadFile(String fullPath, String originalFileName) throws IOException {
		throw new RuntimeException("Not supported.");
	}

}
