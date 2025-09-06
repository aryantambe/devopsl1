// Path: src/test/java/CloudSimExamplesTest.java
package com.cloudsim.finaltest;

import org.cloudbus.cloudsim.examples.CloudSimExample1;
import org.junit.Test;

public class CloudSimExamplesTest {

    @Test
    public void testExample1() {
        // Run CloudSimExample1 main to ensure it executes without errors
        String[] args = {};
        CloudSimExample1.main(args);
        System.out.println("CloudSimExample1 ran successfully!");
    }
}