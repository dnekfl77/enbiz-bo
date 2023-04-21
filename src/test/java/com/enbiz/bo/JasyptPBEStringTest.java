package com.enbiz.bo;

import org.jasypt.intf.cli.JasyptPBEStringDecryptionCLI;
import org.jasypt.intf.cli.JasyptPBEStringEncryptionCLI;

public class JasyptPBEStringTest {
	
	public static void main(String[] args) {
		String[] encParam = {"input=test", "password=local", "algorithm=PBEWITHHMACSHA512ANDAES_256", "saltGeneratorClassName=org.jasypt.salt.RandomSaltGenerator", "ivGeneratorClassName=org.jasypt.iv.RandomIvGenerator", "stringOutputType=base64"};
		
		JasyptPBEStringEncryptionCLI.main(encParam);
		
		
		String[] decParam = {"input=tPTaIXGb/JuKzYzDn0Yba44yrURlH9GsO1vMxPW9mR6kBoNR0CWqTY4vXTuhJkSdEcTn836uapzV0ILlnCV/wQ==", "password=local", "algorithm=PBEWITHHMACSHA512ANDAES_256", "saltGeneratorClassName=org.jasypt.salt.RandomSaltGenerator", "ivGeneratorClassName=org.jasypt.iv.RandomIvGenerator", "stringOutputType=base64"};
		
		JasyptPBEStringDecryptionCLI.main(decParam);
	}

}
