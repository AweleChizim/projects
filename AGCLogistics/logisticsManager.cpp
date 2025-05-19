#include <iostream>
#include <fstream>
#include <stack>
#include <list>
#include <queue>
#include <deque>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct Parcel {
    int key;
    string data1, data2, data3, data4;
    Parcel* left;
    Parcel* right;
    
    Parcel(int parcelId, string recipient, string address, string deliveryPriority, string deliveryRoute) {
        key = parcelId;
        data1 = recipient;
        data2 = address;
        data3 = deliveryPriority;
        data4 = deliveryRoute;
        left = nullptr;
        right = nullptr;
    }
};

int idNo = 100;
int parcelsByRouteA, parcelsByRouteB, parcelsByRouteC, parcelsByRouteD;
list<Parcel> parcelStorage;
list<Parcel> deliveredParcels;
deque<Parcel> parcelsByPriority;
stack<Parcel> unDo_reDo;
queue<Parcel> routeA_Parcels;
queue<Parcel> routeB_Parcels;
queue<Parcel> routeC_Parcels;
queue<Parcel> routeD_Parcels;

int registerParcel() { 
    idNo += 1; //generate parcelId
    int priorityInput, lgaInput;
    string recipient, address, lga, priorityLevel;

    try{
        //collect parcel details
        cout << "Enter the name of the parcel's recipient: ";
        getline(cin, recipient);
        cin.ignore();
        transform(recipient.begin(), recipient.end(), recipient.begin(), ::toupper); 
        cout << "Enter the address of the parcel's recipient: ";
        getline(cin, address);
        cin.ignore();  
        cout << "Select the LGA of the address: \n";
        cout << "Enter 1 for Ibeju-Lekki/Epe\n      2 for Sangotedo/Awoyaya\n"
        "      3 for Ajah/Abraham-Adesanya\n      4 for Others\n";
        cin >> lgaInput;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        if (lgaInput == 1) {
            lga = "Ibeju-Lekki/Epe (Route A)";
        } else if (lgaInput == 2) {
            lga = "Sangotedo/Awoyaya (Route B)";
        } else if (lgaInput == 3) {
            lga = "Ajah/Abraham-Adesanya (Route C)";
        } else if (lgaInput == 4) {
            lga = "Others (Route D)";
        } else {
            throw runtime_error("Only digits 1-4 are allowed!");
        }
        cout << "Select the parcel's delivery priority: \n";
        cout << "Enter 1 for HIGH\n      2 for LOW\n";
        cin >> priorityInput;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        if (priorityInput == 1) {
            priorityLevel = "HIGH";
        } else if (priorityInput == 2) {
            priorityLevel = "LOW";
        } else {
            throw runtime_error("Expected either integer 1 or 2");
        }
        
            
        //allow undo or redo using a stack
        int input1;
        unDo_reDo.push(Parcel(idNo, recipient, address, priorityLevel, lga));
        cout << "Enter 0 to proceed or 1 to undo action: ";
        cin >> input1;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        if (input1 == 0) {
            parcelStorage.push_back(unDo_reDo.top());
            if (priorityLevel == "HIGH") {
                parcelsByPriority.push_front(unDo_reDo.top());
            } else if (priorityLevel == "LOW") {
                parcelsByPriority.push_back(unDo_reDo.top());
            }
            cout << "Parcel ID No." << unDo_reDo.top().key << " has been successfully registered.\n";
            unDo_reDo.pop();
        } else if (input1 == 1) {
            unDo_reDo.pop();
            cout << "Action successfully undone!\n";
            int input2;
            unDo_reDo.push(Parcel(idNo, recipient, address, priorityLevel, lga));
            cout << "Enter 0 to proceed or 1 to redo action: ";
            cin >> input2;
            if (cin.fail()) { 
                cin.clear(); 
                cin.ignore(); 
                throw invalid_argument("Expected an integer."); 
            }
            cin.ignore();
            if (input2 == 0) {
                unDo_reDo.pop();
            } else if (input2 == 1) {
                parcelStorage.push_back(unDo_reDo.top());
                if (priorityLevel == "HIGH") {
                    parcelsByPriority.push_front(unDo_reDo.top());
                } else if (priorityLevel == "LOW") {
                    parcelsByPriority.push_back(unDo_reDo.top());
                }
                cout << "Parcel ID No." << unDo_reDo.top().key << " has been successfully registered.\n";
                unDo_reDo.pop();
            } else {
                throw runtime_error("Expected either integer 0 or 1");
            } 
        } else {
            throw runtime_error("Expected either integer 0 or 1");
        }    
    } 
    catch (const runtime_error& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    } 
    catch (const invalid_argument& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    }
    
    return 0;
}

int searchForParcel() {
    int input, parcelId;
    string recipientName;

    class parcelManagerTree {
    public:
        Parcel* root;
        
        parcelManagerTree() {
            root = nullptr;
        }
        
        void create() {
            for (const auto& parcel : parcelStorage){
                root = insertParcel(root, parcel.key, parcel.data1, parcel.data2, parcel.data3, parcel.data4);
            }
        }

        void idSearch(int id) {
            cout << endl;
            searchParcelById(root, id);
        }

        void nameSearch(string name) {
            cout << endl;
            searchParcelByName(root, name);
        }
    private:
        Parcel* insertParcel(Parcel* parcel, int id, string name, string address, string priority, string route) {
            if (parcel == nullptr) {
                return new Parcel(id, name, address, priority, route);
            } 
            if (id < parcel->key) {
                parcel->left = insertParcel(parcel->left, id, name, address, priority, route);
            } else {
                parcel->right = insertParcel(parcel->right, id, name, address, priority, route);
            }        
            return parcel;
        }

        Parcel* searchParcelById(Parcel* parcel, int id) {
            if (parcel == nullptr){
                cout << "Parcel with ID no " << id << " Not Found.\n";
            } else {
                if (parcel->key == id) {
                    cout << "Parcel ID: " << parcel->key << "\nRecipient Name: " << parcel->data1 
                    << "\nAddress: " << parcel->data2 << "\nRoute: " << parcel->data4 << "\nPriority: " 
                    << parcel->data3 <<"\n\n";
                } else if (parcel->key < id) {
                    searchParcelById(parcel->right, id);
                } else {
                    searchParcelById(parcel->left, id);
                }
            }
            return parcel;
        }

        Parcel* searchParcelByName(Parcel* parcel, string name) {
            if (parcel == nullptr){
                cout << "Parcel with recipient name '" << name << "' not found.\n";
            } else {
                if (parcel->data1 == name) {
                    cout << "Parcel ID: " << parcel->key << "\nRecipient Name: " << parcel->data1 
                    << "\nAddress: " << parcel->data2 << "\nRoute: " << parcel->data4 << "\nPriority: " 
                    << parcel->data3 <<"\n\n";
                } else if (parcel->data1 < name) {
                    searchParcelByName(parcel->right, name);
                } else {
                    searchParcelByName(parcel->left, name);
                }
            }
            return parcel;
        }
    };
    parcelManagerTree parcels;  
    parcels.create();
    try {
        cout << "Please enter 1 to search by parcel id\n          or 2 to search by recipient name\n";
        cin >> input;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        if (input == 1) {
            cout << "Enter the parcel's id: ";
            cin >> parcelId; //collect parcelId
            if (cin.fail()) { 
                cin.clear(); 
                cin.ignore(); 
                throw invalid_argument("Expected an integer."); 
            }
            cin.ignore();
            parcels.idSearch(parcelId);
        } else if (input == 2) {
            cout << "Enter the recipient's name: ";
            getline(cin, recipientName); //collect recipientName
            cin.ignore();
            transform(recipientName.begin(), recipientName.end(), recipientName.begin(), ::toupper); 
            parcels.nameSearch(recipientName);
        } else {
            throw runtime_error("Expected either integer 1 or 2");   
        }
    } 
    catch (const runtime_error& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    } 
    catch (const invalid_argument& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    }
    return 0;
}

int cancelParcel() {
    int parcelId;

    try {
        cout << "Please enter the parcel's id\n";
        cin >> parcelId;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
    
        int count1, index1, hold1;
        count1 = 0;
        hold1 = 0;
        for (const auto& parcel : parcelStorage){
            hold1+=1;
            if (parcel.key == parcelId){
                index1 = hold1;
                count1+=1;
            } else {
                count1+=0;
            }
        }
        if (count1 < 1){
            cout << "Parcel with ID No." << parcelId << " not found.\n";
        } else {
            int hold2 = 0;
            int count2 = 0;
            int index2 = 0;
            for (const auto& parcel : parcelsByPriority){
                hold2+=1;
                if (parcel.key == parcelId){
                    unDo_reDo.push(parcel);
                    index2 = hold2;
                    count2+=1;
                } else {
                    count2+=0;
                }
            }
            if (count2 >= 1){
                //allow undo or redo using a stack
                int input1;
                cout << "Enter 0 to proceed or 1 to undo action: ";
                cin >> input1;
                if (cin.fail()) { 
                    cin.clear(); 
                    cin.ignore(); 
                    throw invalid_argument("Expected an integer."); 
                }
                cin.ignore();
                if (input1 == 0) {
                    auto indexS = parcelStorage.begin();
                    advance(indexS, index1-1);
                    parcelStorage.erase(indexS);

                    auto indexP = parcelsByPriority.begin();
                    advance(indexP, index2-1);
                    parcelsByPriority.erase(indexP); 

                    cout << "Parcel with ID No." << parcelId << " has been cancelled.\n";
                    unDo_reDo.pop();
                } else if (input1 == 1) {
                    cout << "Action successfully undone!\n";
                    int input2;
                    cout << "Enter 0 to proceed or 1 to redo action: ";
                    cin >> input2;
                    if (cin.fail()) { 
                        cin.clear(); 
                        cin.ignore(); 
                        throw invalid_argument("Expected an integer."); 
                    }
                    cin.ignore();
                    if (input2 == 0) {
                        unDo_reDo.pop();
                    } else if (input2 == 1) {
                        auto indexS = parcelStorage.begin();
                        advance(indexS, index1-1);
                        parcelStorage.erase(indexS);

                        auto indexP = parcelsByPriority.begin();
                        advance(indexP, index2-1);
                        parcelsByPriority.erase(indexP); 

                        cout << "Parcel with ID No." << parcelId << " has been cancelled.\n";
                        unDo_reDo.pop();
                    } else {
                        throw runtime_error("Expected either integer 0 or 1");
                    } 
                } else {
                    throw runtime_error("Expected either integer 0 or 1");
                }    
            } else {
                cout << "Parcel with ID No." << parcelId << " is already out for delivery, and cannot be cancelled now.\n";
            }
        }
    } catch (const runtime_error& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    } 
    catch (const invalid_argument& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    }  
    return 0;
}

int assignParcelToRoute() {
    if (parcelsByPriority.empty()) {
        cout << "No parcels available to be assigned.\n";
    } else {
        if (parcelsByPriority.front().data4 == "Ibeju-Lekki/Epe (Route A)") {
            routeA_Parcels.push(parcelsByPriority.front());
            parcelsByPriority.pop_front();
            cout << "Parcel successfully assigned to Ibeju-Lekki/Epe (Route A).\n";
        } else if (parcelsByPriority.front().data4 == "Sangotedo/Awoyaya (Route B)") {
            routeB_Parcels.push(parcelsByPriority.front());
            parcelsByPriority.pop_front();
            cout << "Parcel successfully assigned to Sangotedo/Awoyaya (Route B).\n";
        } else if (parcelsByPriority.front().data4 == "Ajah/Abraham-Adesanya (Route C)") {
            routeC_Parcels.push(parcelsByPriority.front());
            parcelsByPriority.pop_front();
            cout << "Parcel successfully assigned to Ajah/Abraham-Adesanya (Route C).\n";
        } else if (parcelsByPriority.front().data4 == "Others (Route D)") {
            routeD_Parcels.push(parcelsByPriority.front());
            parcelsByPriority.pop_front();
            cout << "Parcel successfully assigned to Others (Route D).\n";
        }
    }
    return 0;
}

int loadParcelToTruck() { 
    int input;
    try {
        cout << "Enter 1 to load onto a route A truck\n      2 to load onto a route B truck\n      3 to load onto a route C truck\n      4 to load onto a route D truck\n";
        cin >> input;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        if (input == 1) {
            if (routeA_Parcels.empty()) {
                cout << "No parcel waiting to be loaded onto a Route A truck.\n";
            } else {
                deliveredParcels.push_back(routeA_Parcels.front());
                parcelsByRouteA+=1;
                routeA_Parcels.pop();
                cout << "Parcel successfully loaded onto a Route A truck.\n";
            }
        } else if (input == 2) {
            if (routeB_Parcels.empty()) {
                cout << "No parcel waiting to be loaded onto a Route B truck.\n";
            } else {
                deliveredParcels.push_back(routeB_Parcels.front());
                parcelsByRouteB+=1;
                routeB_Parcels.pop();
                cout << "Parcel successfully loaded onto a Route B truck.\n";
            }
        } else if (input == 3) {
            if (routeC_Parcels.empty()) {
                cout << "No parcel waiting to be loaded onto a Route C truck.\n";
            } else {
                deliveredParcels.push_back(routeC_Parcels.front());
                parcelsByRouteC+=1;
                routeC_Parcels.pop();
                cout << "Parcel successfully loaded onto a Route C truck.\n";
            }
        } else if (input == 4) {
            if (routeD_Parcels.empty()) {
                cout << "No parcel waiting to be loaded onto a Route D truck.\n";
            } else {
                deliveredParcels.push_back(routeD_Parcels.front());
                parcelsByRouteD+=1;
                routeD_Parcels.pop();
                cout << "Parcel successfully loaded onto a Route D truck.\n";
            }
        } else {
            throw runtime_error("Only digits 1-4 are allowed!");
        }
    } 
    catch (const runtime_error& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    } 
    catch (const invalid_argument& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    }
    return 0;
}

int checkIfParcelHasBeenDelivered() {
    int parcelId;

    try {
        cout << "Please enter the parcel's id\n";
        cin >> parcelId;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        int count = 0;
        if (deliveredParcels.empty()) {
            cout << "Parcel with ID No." << parcelId << " has not been delivered.\n";
        } else {
            for (const auto& parcel : deliveredParcels){
                if (parcel.key == parcelId){
                    cout << "Parcel with ID No." << parcelId << " has been delivered.\n";
                    count+=1;
                } else {
                    count+=0;
                }
            }
            if (count < 1){
                cout << "Parcel with ID No." << parcelId << " has not been delivered.\n";
            }
        }
    }
    catch (const invalid_argument& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    }

    return 0;
}

int displayReport() {
    cout << "TOTAL PARCELS DELIVERED\n  " << deliveredParcels.size() << " parcel(s).\n\n";
    cout << "PARCELS PENDING DELIVERY (by priority)\n";
    cout << "Waiting to be assigned a route\n";
    if (parcelsByPriority.empty()){
        cout << "0 parcels\n";
    } else {
        for (const auto& parcel : parcelsByPriority){
            cout << "Parcel ID: " << parcel.key << "\nRecipient Name: " << parcel.data1 << "\nAddress: " 
            << parcel.data2 << "\nRoute: " << parcel.data4 << "\nPriority: " << parcel.data3 <<"\n\n";
        }
    }
    cout <<endl;
    int pending = routeA_Parcels.size() + routeB_Parcels.size() + routeC_Parcels.size() + routeD_Parcels.size();
    cout << "Waiting to be loaded onto a truck: " << pending << " parcel(s)\n";
    cout << "Total parcels pending delivery: " << pending + parcelsByPriority.size() << " parcel(s)\n\n";
    cout << "DELIVERY ROUTES USED\n";
    cout << "Ibeju-Lekki/Epe (Route A): " << parcelsByRouteA << " parcel(s)\n";
    cout << "Sangotedo/Awoyaya (Route B): " << parcelsByRouteB << " parcel(s)\n";
    cout << "Ajah/Abraham-Adesanya (Route C): " << parcelsByRouteC << " parcel(s)\n";
    cout << "Others (Route D): " << parcelsByRouteD << " parcel(s)\n\n";
    return 0;
}

int saveReport() {
    ofstream file("C:/Users/chizi/Desktop/Logistics_Management_Report.txt"); //creating file

    // Writing to file
    file << "       Logistics Management Report     \n\n";
    file << "TOTAL PARCELS DELIVERED: " << deliveredParcels.size() << " parcel(s).\n\n";
    file << "PARCELS PENDING DELIVERY (by priority)\n";
    file << "Waiting to be assigned a route\n";
    if (parcelsByPriority.empty()){
        file << "0 parcels\n";
    } else {
        for (const auto& parcel : parcelsByPriority){
            file << "Parcel ID: " << parcel.key << "\nRecipient Name: " << parcel.data1 << "\nAddress: " 
            << parcel.data2 << "\nRoute: " << parcel.data4 << "\nPriority: " << parcel.data3 <<"\n\n";
        }
    }
    file <<endl;
    int pending = routeA_Parcels.size() + routeB_Parcels.size() + routeC_Parcels.size() + routeD_Parcels.size();
    file << "Waiting to be loaded onto a truck: " << pending << " parcel(s)\n";
    file << "Total parcels pending delivery: " << pending + parcelsByPriority.size() << " parcel(s)\n\n";
    file << "DELIVERY ROUTES USED\n";
    file << "Ibeju-Lekki/Epe (Route A): " << parcelsByRouteA << " parcel(s)\n";
    file << "Sangotedo/Awoyaya (Route B): " << parcelsByRouteB << " parcel(s)\n";
    file << "Ajah/Abraham-Adesanya (Route C): " << parcelsByRouteC << " parcel(s)\n";
    file << "Others (Route D): " << parcelsByRouteD << " parcel(s)\n\n";
    
    file.close(); // closing file
    cout << "Report has been saved to files.\n";
    return 0;
}

int menu() {
    int input1;
    cout << "Please enter 1 to register a new parcel.\n";
    cout << "       enter 2 to search for a parcel.\n";
    cout << "       enter 3 to cancel a parcel.\n";
    cout << "       enter 4 to assign a parcel to a delivery route.\n";
    cout << "       enter 5 to load a parcel onto a delivery truck.\n";
    cout << "       enter 6 to check if a parcel has been delivered.\n";
    cout << "       enter 7 to display report.\n";
    cout << "       enter 8 to save report.\n";
    cout << "       enter 9 to return to main menu.\n";
    try {    
        cin >> input1;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        if ((input1 < 1) || (input1 > 9)) {
            throw runtime_error("Please enter an integer from 1-9.");
        }
    } 
    catch (const runtime_error& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    } 
    catch (const invalid_argument& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    }
    return input1;
}

int mainMenu() {
    int input1;
    try {
        cout << "\nPlease enter 1 to view menu.\n";
        cout << "       enter 2 to exit program\n";
        cin >> input1;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        if ((input1 < 1) || (input1 > 2)) {
            throw runtime_error("Please enter either 1 or 2.");
        }
    } 
    catch (const runtime_error& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    } 
    catch (const invalid_argument& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    }
    
    return input1;    
}

int main() {
    cout << "                   Welcome to AGC Logistics Management                   ";
    cout << "\n                                            Developed by AGC Developers\n\n";

    int menuKey;
    int mainMenuKey = mainMenu();
    while (mainMenuKey != 2) {
        if (mainMenuKey == 1) { 
            menuKey = menu();
            if (menuKey == 1) { 
                registerParcel();
            } else if (menuKey == 2) { 
                searchForParcel();
            } else if (menuKey == 3) { 
                cancelParcel();
            } else if (menuKey == 4) { 
                assignParcelToRoute();
            } else if (menuKey == 5) { 
                loadParcelToTruck();
            } else if (menuKey == 6) { 
                checkIfParcelHasBeenDelivered();
            } else if (menuKey == 7) { 
                displayReport();
            } else if (menuKey == 8) { 
                saveReport();
            } else if (menuKey == 9) { 
                cout <<"\n";
            }
        }
        mainMenuKey = mainMenu();
    }
    cout << "For more enquiries, please contact our help center at agclogosticsmgmt@mail.com."
    "\nThank you for using AGC Logistics Management!\n"<<endl;
    return 0;
}