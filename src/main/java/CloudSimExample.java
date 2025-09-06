import org.cloudbus.cloudsim.*;
import org.cloudbus.cloudsim.core.CloudSim;
import org.cloudbus.cloudsim.provisioners.PeProvisionerSimple;
import org.cloudbus.cloudsim.provisioners.RamProvisionerSimple;
import org.cloudbus.cloudsim.provisioners.BwProvisionerSimple;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class CloudSimExample {
    public static void main(String[] args) {

        // Step 1: Initialize the CloudSim library
        int numUsers = 1;
        Calendar calendar = Calendar.getInstance();
        boolean traceFlag = false;
        CloudSim.init(numUsers, calendar, traceFlag);

        // Step 2: Create Datacenter
        Datacenter datacenter0 = createDatacenter("Datacenter_0");

        // Step 3: Create Broker
        DatacenterBroker broker = null;
        try {
            broker = new DatacenterBroker("Broker");
        } catch (Exception e) {
            e.printStackTrace();
        }

        int brokerId = broker.getId();

        // Step 4: Create VM list
        List<Vm> vmlist = new ArrayList<>();

        int mips = 1000;
        long size = 10000;
        int ram = 1024;
        long bw = 1000;
        int pesNumber = 1;
        String vmm = "Xen";

        Vm vm1 = new Vm(0, brokerId, mips, pesNumber, ram, bw, size, vmm, new CloudletSchedulerTimeShared());
        Vm vm2 = new Vm(1, brokerId, mips, pesNumber, ram, bw, size, vmm, new CloudletSchedulerTimeShared());

        vmlist.add(vm1);
        vmlist.add(vm2);
        broker.submitVmList(vmlist);

        // Step 5: Create Cloudlet list
        List<Cloudlet> cloudletList = new ArrayList<>();
        UtilizationModel utilizationModel = new UtilizationModelFull();

        Cloudlet cloudlet1 = new Cloudlet(0, 40000, pesNumber, 300, 300,
                utilizationModel, utilizationModel, utilizationModel);
        cloudlet1.setUserId(brokerId);
        cloudlet1.setVmId(0); // Assign to VM 0

        Cloudlet cloudlet2 = new Cloudlet(1, 30000, pesNumber, 500, 500,
                utilizationModel, utilizationModel, utilizationModel);
        cloudlet2.setUserId(brokerId);
        cloudlet2.setVmId(1); // Assign to VM 1

        cloudletList.add(cloudlet1);
        cloudletList.add(cloudlet2);

        broker.submitCloudletList(cloudletList);

        // Step 6: Start simulation
        CloudSim.startSimulation();

        List<Cloudlet> newList = broker.getCloudletReceivedList();
        CloudSim.stopSimulation();

        printCloudletList(newList);
    }

    private static Datacenter createDatacenter(String name) {
        List<Host> hostList = new ArrayList<>();

        int mips = 1000;
        int ram = 4096; // Enough RAM for 2 VMs
        long storage = 1000000;
        int bw = 10000;

        List<Pe> peList = new ArrayList<>();
        peList.add(new Pe(0, new PeProvisionerSimple(mips)));
        peList.add(new Pe(1, new PeProvisionerSimple(mips))); // Added second PE for parallelism

        Host host = new Host(0, new RamProvisionerSimple(ram),
                new BwProvisionerSimple(bw), storage, peList,
                new VmSchedulerTimeShared(peList));

        hostList.add(host);

        String arch = "x86";
        String os = "Linux";
        String vmm = "Xen";
        double timeZone = 10.0;
        double cost = 3.0;
        double costPerMem = 0.05;
        double costPerStorage = 0.1;
        double costPerBw = 0.1;

        DatacenterCharacteristics characteristics = new DatacenterCharacteristics(
                arch, os, vmm, hostList, timeZone, cost, costPerMem,
                costPerStorage, costPerBw);

        Datacenter datacenter = null;
        try {
            datacenter = new Datacenter(name, characteristics,
                    new VmAllocationPolicySimple(hostList), new ArrayList<Storage>(), 0);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return datacenter;
    }

    private static void printCloudletList(List<Cloudlet> list) {
        System.out.println("========== OUTPUT ==========");
        System.out.printf("%-15s%-15s%-18s%-10s%-10s%-15s%-15s%n",
                "Cloudlet ID", "STATUS", "Data center ID", "VM ID", "Time", "Start Time", "Finish Time");

        for (Cloudlet cloudlet : list) {
            System.out.printf("%-15d", cloudlet.getCloudletId());

            if (cloudlet.getStatus() == Cloudlet.SUCCESS) {
                System.out.printf("%-15s", "SUCCESS");
                System.out.printf("%-18d", cloudlet.getResourceId());
                System.out.printf("%-10d", cloudlet.getVmId());
                System.out.printf("%-10.2f", cloudlet.getActualCPUTime());
                System.out.printf("%-15.2f", cloudlet.getExecStartTime());
                System.out.printf("%-15.2f%n", cloudlet.getFinishTime());
            }
        }
    }
}